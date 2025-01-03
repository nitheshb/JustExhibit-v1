import React, { useEffect, useState } from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { Ticket  } from 'lucide-react'

import { storage } from 'src/context/firebaseConfig'

import { useAuth } from 'src/context/firebase-auth-context'
import { updateEventLogo } from 'src/context/dbQueryFirebase'

const ProjectLogoUploader = ({projectId, eventLogoURL}) => {
  const { user } = useAuth()

  const { orgId } = user
  const [imageUrl, setImageUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = React.useRef(null)



  useEffect(() => {
    setImageUrl(eventLogoURL)

  }, [eventLogoURL])


  const uploadToFirebase = async (file) => {
    setIsUploading(true)
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `${orgId}_projectLogos_images/${uid}.png`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          console.log(`Upload is ${progress}% done`)
        },
        (err) => {
          console.error('Upload error:', err)
          setError('Failed to upload image. Please try again.')
          setIsUploading(false)
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          updateEventLogo(orgId, projectId,  url, user.email)


          setImageUrl(url)
          setIsUploading(false)
          console.log('File uploaded successfully. URL:', url)
        }
      )
    } catch (err) {
      setError('Upload failed. Please try again.')
      console.error('Error during upload:', err)
      setIsUploading(false)
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      setError('Please select only .jpg, .jpeg, or .png files.')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.')
      return
    }

    setError('')
    uploadToFirebase(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col  items-start">
      <div className="relative">
        {/* <div className=" text-[#374151] text-xs ml-2">
          <p>Logo</p>
        </div> */}

        <div
          onClick={handleUploadClick}
          className="h-[165px] w-[172px] mt-1 bg-gray-200 flex items-center justify-center rounded-[25px] border border-gray-300 cursor-pointer"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="h-40 w-40 object-fit rounded-md"
            />
          ) : (
            <span className="text-gray-500">
            <Ticket className="w-14 h-14 text-[#57C0D0]" />


            </span>
          )}
        </div>

        <button
          onClick={handleUploadClick}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full text-white shadow-lg hover:bg-gray-600 m-2"
          disabled={isUploading}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.58333 26.1475H5.95833L22.25 10.4172L19.875 8.12398L3.58333 23.8544V26.1475ZM0.25 29.366V22.5267L22.25  .32491C22.5833 1.02989 22.9514 0.801909 23.3542 0.640984C23.7569 0.480059 24.1806 0.399597 24.625 0.399597C25.0694 0.399597 25.5 0.480059 25.9167 0.640984C26.3333 0.801909 26.6944 1.0433 27 1.36515L29.2917 3.61809C29.625 3.91312 29.8681 4.26179 30.0208 4.6641C30.1736 5.06641 30.25 5.46872 30.25 5.87104C30.25 6.30017 30.1736 6.70918 30.0208 7.09809C29.8681 7.48699 29.625 7.84236 29.2917 8.16421L7.33333 29.366H0.25ZM21.0417 9.29068L19.875 8.12398L22.25 10.4172L21.0417 9.29068Z"
              fill="#484848"
            />
          </svg>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  )
}

export default ProjectLogoUploader
