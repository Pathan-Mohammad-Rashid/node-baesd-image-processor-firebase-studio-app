"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NodeCanvas({ onNodeSelect }: { onNodeSelect: (nodeId: string) => void }) {
  const [nodes, setNodes] = useState<{ id: string; label: string }[]>([
    { id: "1", label: "Image Input" },
    { id: "2", label: "Brightness/Contrast" },
    { id: "3", label: "Output" },
  ]);

  const handleNodeClick = useCallback((nodeId: string) => {
    onNodeSelect(nodeId);
  }, [onNodeSelect]);

  return (
    <div className="flex-1 p-4">
      <h2 className="text-lg font-semibold mb-4">Node Canvas</h2>
      <Card>
        <CardContent className="flex gap-4">
          {nodes.map((node) => (
            <Button key={node.id} variant="outline" onClick={() => handleNodeClick(node.id)}>
              {node.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
