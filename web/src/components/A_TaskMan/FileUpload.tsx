import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/context/firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

export default function FileUpload  ({ files, setFiles, removeFile }) {
  const [progress, setProgress] = useState(0)
  const docUploadHandler = async (e) => {
    e.preventDefault()
    uploadStuff(e.target[0].files[0])
  }
  const uploadStuff = async (file) => {
    if (!file) return
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `/spark_files/${'taskFiles'}_${uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgress(prog)
          file.isUploading = false

        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // createAttach(orgId, url, by, file.name, id, attachType)
            file.url = url
            setFiles([...files, file])
            console.log('file url i s', url)
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  const uploadHandler = (event) => {
    const file = event.target.files[0]
    if (!file) return
    file.isUploading = true
    setFiles([...files, file])

    // upload file
    const formData = new FormData()
    formData.append('newFile', file, file.name)
    uploadStuff(file)
  }

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            {/* <i>
              <FontAwesomeIcon icon={faPlus} />
            </i> */}
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">PDF, JPG, PNG</p>
      </div>
    </>
  )
}

