/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Pencil } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import EditIcon from '@material-ui/icons/Edit';


import { storage, auth } from 'src/context/firebaseConfig'
import { useAuth } from 'src/context/firebase-auth-context'
import { updateUserAvatar } from 'src/context/dbQueryFirebase'

const UserAvatarUpload = () => {
  const { user } = useAuth()

  const { orgId } = user
  const [imageUrl, setImageUrl] = useState(auth?.currentUser?.photoURL || '')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = React.useRef(null)

  // Simulate Firebase storage upload function
  const uploadToFirebase = async (file) => {
    // In a real implementation, you would:
    // 1. Create a reference to Firebase Storage
    // 2. Upload the file
    // 3. Get the download URL
    // Here's a simulation for demo purposes:
    setIsUploading(true)
    console.log('file test', file);
    try {
      const uid = uuidv4()

      const storageRef = ref(storage, `/${orgId}_userProfile/_${uid}.png`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      // const uploadTask = storageRef.put(file);
      return uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
console.log('iam here')
          // setProgress(prog)
        },
        (err) => console.log(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref)

          updateUserAvatar(orgId, user.uid,user.email, url, user.email)
          await updateProfile( auth.currentUser, {
            photoURL: url
          });

          // await auth.currentUser.getIdToken(true)
          const currentUser = auth.currentUser

          console.log('uploaded profile pic is', url, currentUser, user)
        setImageUrl(url)
        setIsUploading(true)


       window.location.reload()


          return url
          //  save this doc as a new file in spark_leads_doc
        }
      )
    } catch (error) {
      return ''
      console.log('upload error is ', error)
    }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const fakeUrl = URL.createObjectURL(file)
    //     resolve(fakeUrl)
    //   }, 1500)
    // })
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(file.type)) {
      setError('Please select only .jpg, .jpeg, or .png files')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    try {
      setIsUploading(true)
      setError('')
      const url = await uploadToFirebase(file)
      // setImageUrl(url)
    } catch (err) {
      setError('Failed to upload image. Please try again.')
      console.error('Upload error:', err)
    } finally {
      // setIsUploading(false)
    }
  }

  const handleEditClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="-mt-12 relative flex items-center justify-center">
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="User avatar"
            className="h-24 w-24 bottom-4 rounded-full border-4 border-white shadow-lg"
          />
        ) : (
          <img
            className="h-24 w-24 bottom-4 rounded-full border-4 border-white shadow-lg"
            src="/avatar_1.png"
            alt="Image Description"
          />
        )}

        <button
          onClick={handleEditClick}
          className="absolute bottom-0 right-0 p-2        text-[#fff]  bg-[#f56565] rounded-full shadow-lg"
          disabled={isUploading}
        >

            <EditIcon className="w-3 h-3"/>

        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {isUploading && <div className="text-sm mt-r text-green-600">Uploading...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  )
}

export default UserAvatarUpload
