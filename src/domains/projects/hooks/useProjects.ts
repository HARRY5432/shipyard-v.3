import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../types";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, addDoc, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "@/domains/auth/hooks/useAuth";

const PROJECTS_COLLECTION = "projects";

export const useProjects = (filters?: { status?: string; ownerId?: string }) => {
  return useQuery({
    queryKey: ["projects", filters],
    queryFn: async () => {
      let q = query(collection(db, PROJECTS_COLLECTION), orderBy("created_at", "desc"));
      
      if (filters?.status) {
        q = query(q, where("status", "==", filters.status));
      }
      if (filters?.ownerId) {
        q = query(q, where("owner_id", "==", filters.ownerId));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
    }
  });
};

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) return null;
      const docRef = doc(db, PROJECTS_COLLECTION, projectId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) throw new Error("Project not found");
      return { id: snapshot.id, ...snapshot.data() } as Project;
    },
    enabled: !!projectId
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: any) => { // Using any temporarily while migrating
      if (!user) throw new Error("Must be logged in to create a project");
      
      const projectData = {
        ...data,
        owner_id: user.id,
        created_at: new Date().toISOString(),
        status: "open",
      };
      
      const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectData);
      return { id: docRef.id, ...projectData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
};
