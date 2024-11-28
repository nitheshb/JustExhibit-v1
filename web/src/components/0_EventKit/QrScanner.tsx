import React, { useEffect, useState, useRef } from 'react'

import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode'
import { Scan, Upload, Camera, X } from 'lucide-react'

interface ScannedData {
  id: string
  name: string
  email: string
  phone: string
  message: string
}

export default function QRScanner() {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null)
  const [error, setError] = useState<string>('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanMethod, setScanMethod] = useState<'camera' | 'file' | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const [scanResult, setScanResult] = useState(null)
  const validateQRData = (data: any): data is ScannedData => {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      typeof data.email === 'string' &&
      typeof data.phone === 'string' &&
      typeof data.message === 'string'
    )
  }

  const handleSuccessfulScan = (decodedText: string) => {
    try {
      const parsedData = JSON.parse(decodedText)
      if (validateQRData(parsedData)) {
        setScannedData(parsedData)
        setError('')
        if (scannerRef.current) {
          scannerRef.current.clear()
        }
        setIsScanning(false)
        setScanMethod(null)
      } else {
        throw new Error('Invalid QR code format')
      }
    } catch (err) {
      setError('Invalid QR Code format. Please scan a valid QR code.')
    }
  }

  const startCameraScanner = () => {
    setScannedData(null)
    setError('')
    setIsScanning(true)
    setScanMethod('camera')
    // const scanner = new Html5QrcodeScanner(
    //   'reader',
    //   {
    //     qrbox: {
    //       width: 250,
    //       height: 250,
    //     },
    //     fps: 5,
    //   },
    //   false
    // )
    // scanner.render(success, error)
    // function success(result) {
    //   scanner.clear()
    //   setScanResult(result)
    // }

    // function error(err) {
    //   console.warn('error is', err)
    // }
    scannerRef.current = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    scannerRef.current.render(handleSuccessfulScan, (error) => {
      console.warn(error);
    });
  }

  const handleFileUpload = async (file: File) => {
    setScannedData(null)
    setError('')
    setIsScanning(true)
    setScanMethod('file')

    try {
      const html5QrCode = new Html5Qrcode('reader')

      try {
        const decodedText = await html5QrCode.scanFile(file, true)
        await html5QrCode.clear()
        handleSuccessfulScan(decodedText)
      } catch (err) {
        setError('Could not read QR code from image. Please try another image.')
        await html5QrCode.clear()
      }
    } catch (err) {
      console.log('error is', err)
      setError('Error processing file. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('border-indigo-500')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-indigo-500')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('border-indigo-500')
    }

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file)
    } else {
      setError('Please drop a valid image file.')
    }
  }

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
    }
    setIsScanning(false)
    setScanMethod(null)
  }

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }, [])

  return (
    <div className="w-full max-w-2xl">
      {scanResult ? (
        <div>
          Success: <a href={'http://' + scanResult}></a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-2 mb-6">
          <Scan className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">QR Code Scanner</h2>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {!isScanning && !scannedData && (
          <div className="space-y-4">
            <button
              onClick={startCameraScanner}
              className="w-full flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Scan with Camera
            </button>

            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-gray-600">
                  Drag and drop your QR code image here
                </p>
                <p className="text-sm text-gray-500">or</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFileUpload(e.target.files[0])
                  }
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Browse Files
                </button>
              </div>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div id="reader"></div>
            <button
              onClick={stopScanning}
              className="w-full flex items-center justify-center gap-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
              Stop Scanning
            </button>
          </div>
        )}

        {scannedData && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Scanned Data:
              </h3>
              <button
                onClick={() => {
                  setScannedData(null)
                  setError('')
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Scan Another
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">ID</p>
                <p className="mt-1">{scannedData.id}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1">{scannedData.name}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{scannedData.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{scannedData.phone}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Message</p>
                <p className="mt-1">{scannedData.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
