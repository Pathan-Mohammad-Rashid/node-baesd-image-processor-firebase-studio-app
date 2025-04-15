"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlus, Info } from "lucide-react";

interface NodeProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

interface NodeCanvasProps {
  onNodeSelect: (nodeId: string) => void;
  imageSrc: string | null;
  nodes: NodeProps[];
  setNodes: React.Dispatch<React.SetStateAction<NodeProps[]>>;
}

export function NodeCanvas({ onNodeSelect, imageSrc, nodes, setNodes }: NodeCanvasProps) {
  const [imageMetadata, setImageMetadata] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        setImageMetadata({ width: img.width, height: img.height });
      };
      img.src = imageSrc;
    } else {
      setImageMetadata(null);
    }
  }, [imageSrc]);

  const handleNodeClick = useCallback((nodeId: string) => {
    onNodeSelect(nodeId);
  }, [onNodeSelect]);

  const handleNodeDrag = (nodeId: string, deltaX: number, deltaY: number) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId
          ? {
              ...node,
              position: {
                x: node.position.x + deltaX,
                y: node.position.y + deltaY,
              },
            }
          : node
      )
    );
  };

  return (
    <div className="flex-1 p-4">
      <h2 className="text-lg font-semibold mb-4">Node Canvas</h2>
      <Card>
        <CardContent className="relative">
          {imageSrc ? (
            <>
              <div className="mb-4">
                <img src={imageSrc} alt="Uploaded Image" className="max-w-full max-h-48 rounded-md" />
                {imageMetadata && (
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Info className="mr-1 h-4 w-4" />
                    Dimensions: {imageMetadata.width} x {imageMetadata.height}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                {nodes.map((node) => (
                   <div
                    key={node.id}
                    className="relative"
                    style={{
                      position: 'absolute',
                      left: node.position.x,
                      top: node.position.y,
                      cursor: 'grab',
                    }}
                    onMouseDown={(e) => {
                      const startX = e.clientX;
                      const startY = e.clientY;

                      const onMouseMove = (e: MouseEvent) => {
                        const deltaX = e.clientX - startX;
                        const deltaY = e.clientY - startY;
                        handleNodeDrag(node.id, deltaX, deltaY);
                      };

                      const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                      };

                      document.addEventListener('mousemove', onMouseMove);
                      document.addEventListener('mouseup', onMouseUp);
                    }}
                  >
                    <Button variant="outline" onClick={() => handleNodeClick(node.id)}>
                      {node.type}
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 rounded-md border-2 border-dashed border-muted-foreground">
              <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No image loaded</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
