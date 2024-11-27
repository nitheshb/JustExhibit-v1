import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { nanoid } from 'nanoid';
import { QrCode, Download, Copy } from 'lucide-react';

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function QRGenerator() {
  const [formData, setFormData] = useState<FormData>({
    id: nanoid(10),
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [qrGenerated, setQrGenerated] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQrGenerated(true);
  };

  const handleDownload = () => {
    if (!qrRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to accommodate QR code and text
    canvas.width = 240;  // QR code + padding
    canvas.height = 280; // QR code + text area

    // Create a temporary image from the QR code SVG
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    img.onload = () => {
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code
      ctx.drawImage(img, 20, 20, 200, 200);

      // Add ID text
      ctx.fillStyle = '#374151'; // text-gray-700
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`ID: ${formData.id}`, canvas.width / 2, 245);

      // Create download link
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-${formData.id}.png`;
      link.href = url;
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(formData));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-2 mb-6">
          <QrCode className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">QR Code Generator</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate QR Code
          </button>
        </form>

        {qrGenerated && (
          <div className="mt-8 flex flex-col items-center">
            <div ref={qrRef} className="p-4 bg-white border-2 border-gray-200 rounded-lg">
              <QRCodeSVG
                value={JSON.stringify(formData)}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
