import React from 'react'
import {
  TrashIcon,
  SparklesIcon,
  DocumentTextIcon,
} from '@heroicons/react/outline'
import { ref, deleteObject } from 'firebase/storage'

import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'

const FileList = ({ files, removeFile }) => {
  const { user } = useAuth()
  const { orgId } = user
  const deleteFileHandler = (file) => {
    console.log('file details are00', file)
    const { name } = file
    removeFile(name)

    return

    removeFile(name)
    const desertRef = ref(storage, 'images/desert.jpg')

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        removeFile(name)
      })
      .catch((e) => {
        // Uh-oh, an error occurred!
      })
    // delete from storage
    // delete from files state
    // axios
    //   .delete(`http://localhost:8080/upload?name=${_name}`)
    //   .then((res) => removeFile(_name))
    //   .catch((err) => console.error(err))
  }
  return (
    <ul className="file-list">
      {files &&
        files.map((file) => (
          <li className="upload-li file-item" key={file.name}>
            <DocumentTextIcon className="w-4 h-4" />
            <p>{file.name}</p>

            <div className="actions">
              <div className="loading"></div>
              {file.isUploading && (
                <SparklesIcon
                  className="w-4 h-4"
                  onClick={() => deleteFileHandler(file)}
                />
              )}
              {!file.isUploading && (
                <TrashIcon
                  className="w-4 h-4"
                  onClick={() => deleteFileHandler(file)}
                />
              )}
            </div>
          </li>
        ))}
    </ul>
  )
}

export default FileList
