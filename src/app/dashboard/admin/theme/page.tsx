'use client';

import React, { useState } from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

export default function ThemePage() {
  const [activeTab, setActiveTab] = useState('colors');
  const [previewMode, setPreviewMode] = useState('desktop');

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center mb-6">
            <Link href="/dashboard/admin" className="mr-4 text-blue-600 hover:text-blue-800">
              ← Back to Admin Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-primary">Advanced Theme Customization</h1>
          <p className="mb-6 text-gray-600">Comprehensive theme customization with advanced styling options and live preview.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Theme Controls Panel */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <div className="flex border-b mb-4">
                  <button
                    onClick={() => setActiveTab('colors')}
                    className={`px-4 py-2 ${activeTab === 'colors' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  >
                    Colors & Variables
                  </button>
                  <button
                    onClick={() => setActiveTab('typography')}
                    className={`px-4 py-2 ${activeTab === 'typography' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  >
                    Typography
                  </button>
                  <button
                    onClick={() => setActiveTab('layout')}
                    className={`px-4 py-2 ${activeTab === 'layout' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  >
                    Layout & Spacing
                  </button>
                  <button
                    onClick={() => setActiveTab('components')}
                    className={`px-4 py-2 ${activeTab === 'components' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  >
                    Components
                  </button>
                  <button
                    onClick={() => setActiveTab('animations')}
                    className={`px-4 py-2 ${activeTab === 'animations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                  >
                    Animations
                  </button>
                </div>

                {/* Colors & Variables Tab */}
                {activeTab === 'colors' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Primary Color Palette</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Primary</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#3B82F6" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Secondary</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#6B7280" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Accent</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#F59E0B" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Success</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#10B981" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Background Colors</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Main Background</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#FFFFFF" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Card Background</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#F9FAFB" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Sidebar Background</label>
                          <input type="color" className="w-full h-12 p-0 border rounded" defaultValue="#1F2937" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">CSS Custom Properties</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block mb-1 font-medium">--primary-color</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="#3B82F6" />
                        </div>
                        <div>
                          <label className="block mb-1 font-medium">--border-radius</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="0.5rem" />
                        </div>
                        <div>
                          <label className="block mb-1 font-medium">--box-shadow</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="0 4px 6px -1px rgba(0, 0, 0, 0.1)" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Typography Tab */}
                {activeTab === 'typography' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Font Family</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Primary Font</label>
                          <select className="w-full p-2 border rounded">
                            <option>Inter</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                            <option>Poppins</option>
                            <option>Montserrat</option>
                            <option>Custom Font</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Secondary Font</label>
                          <select className="w-full p-2 border rounded">
                            <option>Inter</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                            <option>Poppins</option>
                            <option>Montserrat</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Font Sizes</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Base Size</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="16" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Heading 1</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="32" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Heading 2</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="24" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Small Text</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="14" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Font Weights</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Light</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="300" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Regular</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="400" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Medium</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="500" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Bold</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="700" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Layout Tab */}
                {activeTab === 'layout' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Spacing System</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Base Spacing</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="4" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Container Padding</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="16" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Card Padding</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="24" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Section Margin</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="32" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Sidebar Width</label>
                          <select className="w-full p-2 border rounded">
                            <option>240px (Default)</option>
                            <option>200px (Compact)</option>
                            <option>280px (Wide)</option>
                            <option>Collapsible</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Content Max Width</label>
                          <select className="w-full p-2 border rounded">
                            <option>1200px (Default)</option>
                            <option>1000px (Narrow)</option>
                            <option>1400px (Wide)</option>
                            <option>Full Width</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Grid Columns</label>
                          <select className="w-full p-2 border rounded">
                            <option>12 Columns</option>
                            <option>16 Columns</option>
                            <option>24 Columns</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Container Style</label>
                          <select className="w-full p-2 border rounded">
                            <option>Centered</option>
                            <option>Left Aligned</option>
                            <option>Fluid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Components Tab */}
                {activeTab === 'components' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Button Styles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Button Border Radius</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="6" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Button Padding</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="12px 24px" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Button Shadow</label>
                          <select className="w-full p-2 border rounded">
                            <option>None</option>
                            <option>Subtle</option>
                            <option>Medium</option>
                            <option>Strong</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Button Hover Effect</label>
                          <select className="w-full p-2 border rounded">
                            <option>Scale</option>
                            <option>Lift</option>
                            <option>Glow</option>
                            <option>None</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Card Styles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Card Border Radius</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="8" />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Card Shadow</label>
                          <select className="w-full p-2 border rounded">
                            <option>None</option>
                            <option>Subtle</option>
                            <option>Medium</option>
                            <option>Strong</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Card Border</label>
                          <select className="w-full p-2 border rounded">
                            <option>None</option>
                            <option>Light</option>
                            <option>Medium</option>
                            <option>Strong</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Card Hover Effect</label>
                          <select className="w-full p-2 border rounded">
                            <option>None</option>
                            <option>Lift</option>
                            <option>Glow</option>
                            <option>Scale</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Animations Tab */}
                {activeTab === 'animations' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Page Transitions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Page Load Animation</label>
                          <select className="w-full p-2 border rounded">
                            <option>Fade In</option>
                            <option>Slide Up</option>
                            <option>Slide Down</option>
                            <option>Zoom In</option>
                            <option>None</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Animation Duration</label>
                          <input type="number" className="w-full p-2 border rounded" placeholder="300" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Component Animations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 font-medium">Button Click Animation</label>
                          <select className="w-full p-2 border rounded">
                            <option>Ripple</option>
                            <option>Scale</option>
                            <option>Bounce</option>
                            <option>None</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Form Input Focus</label>
                          <select className="w-full p-2 border rounded">
                            <option>Glow</option>
                            <option>Scale</option>
                            <option>Slide</option>
                            <option>None</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Loading Spinner</label>
                          <select className="w-full p-2 border rounded">
                            <option>Circular</option>
                            <option>Dots</option>
                            <option>Pulse</option>
                            <option>None</option>
                          </select>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium">Notification Animation</label>
                          <select className="w-full p-2 border rounded">
                            <option>Slide In</option>
                            <option>Fade In</option>
                            <option>Bounce</option>
                            <option>None</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition">
                    Reset to Default
                  </button>
                  <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
                    Save Theme
                  </button>
                </div>
              </Card>
            </div>

            {/* Live Preview Panel */}
            <div className="lg:col-span-1">
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Live Preview</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`px-2 py-1 text-xs rounded ${previewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                    >
                      Mobile
                    </button>
                    <button
                      onClick={() => setPreviewMode('tablet')}
                      className={`px-2 py-1 text-xs rounded ${previewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                    >
                      Tablet
                    </button>
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`px-2 py-1 text-xs rounded ${previewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                    >
                      Desktop
                    </button>
                  </div>
                </div>
                
                <div className={`border rounded-lg overflow-hidden ${
                  previewMode === 'mobile' ? 'w-64 h-96' : 
                  previewMode === 'tablet' ? 'w-80 h-96' : 
                  'w-full h-96'
                }`}>
                  <div className="bg-gray-800 text-white p-2 text-xs flex justify-between items-center">
                    <span>Preview</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white p-4 h-full overflow-auto">
                    <div className="space-y-4">
                      <div className="bg-blue-100 p-3 rounded">
                        <h3 className="font-semibold text-blue-800">Sample Card</h3>
                        <p className="text-blue-600 text-sm">This is how your cards will look with the current theme.</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Sample Button
                      </button>
                      <div className="border p-3 rounded">
                        <input type="text" placeholder="Sample input" className="w-full p-2 border rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}