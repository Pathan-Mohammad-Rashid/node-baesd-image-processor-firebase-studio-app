"use client";

import { Card, CardContent } from "@/components/ui/card";

export function PropertiesPanel({ selectedNode }: { selectedNode: string | null }) {
  return (
    <div className="w-80 p-4">
      <h2 className="text-lg font-semibold mb-4">Properties Panel</h2>
      <Card>
        <CardContent>
          {selectedNode ? (
            <div>
              <p>Selected Node: {selectedNode}</p>
              {/* Add properties based on the selected node */}
            </div>
          ) : (
            <p>No node selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
