import { useState, useEffect, useRef } from "react";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>;
  entityName: string;
  children: React.ReactNode;
};

export function DataTableBulkActions<TData>({
  table,
  entityName,
  children,
}: DataTableBulkActionsProps<TData>): React.ReactNode | null {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (selectedCount > 0) {
      const message = `${selectedCount} ${entityName}${selectedCount > 1 ? "s" : ""} selected.`;
      queueMicrotask(() => setAnnouncement(message));
      const timer = setTimeout(() => setAnnouncement(""), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [selectedCount, entityName]);

  const handleClearSelection = () => table.resetRowSelection();

  if (selectedCount === 0) return null;

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedCount} selected ${entityName}${selectedCount > 1 ? "s" : ""}`}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      >
        <div
          className={cn(
            "px-3 py-2 shadow-xl rounded-xl border",
            "bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60",
            "flex items-center gap-x-2"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleClearSelection}
                className="h-6 w-6 rounded-full"
                aria-label="Clear selection"
              >
                <X className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear selection</p>
            </TooltipContent>
          </Tooltip>

          <Separator className="h-5" orientation="vertical" />

          <div className="flex items-center gap-x-1 text-sm">
            <Badge variant="default" className="min-w-8 rounded-lg">
              {selectedCount}
            </Badge>
            <span className="hidden sm:inline">
              {entityName}
              {selectedCount > 1 ? "s" : ""}
            </span>
            <span>selected</span>
          </div>

          <Separator className="h-5" orientation="vertical" />

          {children}
        </div>
      </div>
    </>
  );
}
