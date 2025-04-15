"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PropertiesPanelProps {
  selectedNode: string | null;
}

export function PropertiesPanel({ selectedNode }: PropertiesPanelProps) {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [blurRadius, setBlurRadius] = useState(5);
  const [thresholdValue, setThresholdValue] = useState(128);
  const [edgeAlgorithm, setEdgeAlgorithm] = useState("sobel");
  const [blendMode, setBlendMode] = useState("normal");
  const [noiseScale, setNoiseScale] = useState(10);
  const [convolutionKernel, setConvolutionKernel] = useState(""); // Example: "1 2 1, 2 4 2, 1 2 1"

  useEffect(() => {
    // Reset values when selectedNode changes
    setBrightness(0);
    setContrast(1);
    setBlurRadius(5);
    setThresholdValue(128);
    setEdgeAlgorithm("sobel");
    setBlendMode("normal");
    setNoiseScale(10);
    setConvolutionKernel("");
  }, [selectedNode]);

  const renderProperties = () => {
    switch (selectedNode) {
      case 'brightnessContrast':
        return (
          <>
            <Label htmlFor="brightness">Brightness</Label>
            <Slider
              id="brightness"
              defaultValue={[0]}
              min={-100}
              max={100}
              step={1}
              value={[brightness]}
              onValueChange={(value) => setBrightness(value[0])}
            />
            <p className="text-sm text-muted-foreground">Value: {brightness}</p>
            <Label htmlFor="contrast">Contrast</Label>
            <Slider
              id="contrast"
              defaultValue={[1]}
              min={0}
              max={3}
              step={0.1}
              value={[contrast]}
              onValueChange={(value) => setContrast(value[0])}
            />
             <p className="text-sm text-muted-foreground">Value: {contrast}</p>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setBrightness(0)}>Reset Brightness</Button>
              <Button variant="outline" size="sm" onClick={() => setContrast(1)}>Reset Contrast</Button>
            </div>
          </>
        );
      case 'blur':
        return (
          <>
            <Label htmlFor="blurRadius">Blur Radius (1-20px)</Label>
            <Input
              type="number"
              id="blurRadius"
              min={1}
              max={20}
              value={blurRadius}
              onChange={(e) => setBlurRadius(parseInt(e.target.value))}
            />
             <p className="text-sm text-muted-foreground">Value: {blurRadius}</p>
          </>
        );
      case 'threshold':
        return (
          <>
            <Label htmlFor="thresholdValue">Threshold Value</Label>
            <Input
              type="number"
              id="thresholdValue"
              min={0}
              max={255}
              value={thresholdValue}
              onChange={(e) => setThresholdValue(parseInt(e.target.value))}
            />
             <p className="text-sm text-muted-foreground">Value: {thresholdValue}</p>
          </>
        );
      case 'edgeDetection':
        return (
          <>
            <Label htmlFor="edgeAlgorithm">Edge Detection Algorithm</Label>
            <Select value={edgeAlgorithm} onValueChange={setEdgeAlgorithm}>
              <SelectTrigger>
                <SelectValue placeholder="Select Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sobel">Sobel</SelectItem>
                <SelectItem value="canny">Canny</SelectItem>
              </SelectContent>
            </Select>
             <p className="text-sm text-muted-foreground">Value: {edgeAlgorithm}</p>
          </>
        );
      case 'blend':
        return (
          <>
            <Label htmlFor="blendMode">Blend Mode</Label>
            <Select value={blendMode} onValueChange={setBlendMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select Blend Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="multiply">Multiply</SelectItem>
                <SelectItem value="screen">Screen</SelectItem>
                <SelectItem value="overlay">Overlay</SelectItem>
                <SelectItem value="difference">Difference</SelectItem>
              </SelectContent>
            </Select>
             <p className="text-sm text-muted-foreground">Value: {blendMode}</p>
          </>
        );
      case 'noiseGeneration':
        return (
          <>
            <Label htmlFor="noiseScale">Noise Scale</Label>
            <Input
              type="number"
              id="noiseScale"
              value={noiseScale}
              onChange={(e) => setNoiseScale(parseInt(e.target.value))}
            />
             <p className="text-sm text-muted-foreground">Value: {noiseScale}</p>
          </>
        );
      case 'convolutionFilter':
        return (
          <>
            <Label htmlFor="convolutionKernel">Convolution Kernel (3x3 or 5x5 matrix)</Label>
            <Input
              type="text"
              id="convolutionKernel"
              placeholder="e.g., 1 2 1, 2 4 2, 1 2 1"
              value={convolutionKernel}
              onChange={(e) => setConvolutionKernel(e.target.value)}
            />
             <p className="text-sm text-muted-foreground">Value: {convolutionKernel}</p>
          </>
        );
      case 'colorChannelSplitter':
        return (
          <>
            <p>Color Channel Splitter Node</p>
            {/* Add options to output grayscale representation of each channel */}
          </>
        );
      default:
        return <p>Select a node to view its properties.</p>;
    }
  };

  return (
    <div className="w-80 p-4">
      <h2 className="text-lg font-semibold mb-4">Properties Panel</h2>
      <Card>
        <CardContent className="flex flex-col gap-4">
          {selectedNode ? (
            <div>
              <p className="mb-2">Selected Node: {selectedNode}</p>
              {renderProperties()}
            </div>
          ) : (
            <p>No node selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
