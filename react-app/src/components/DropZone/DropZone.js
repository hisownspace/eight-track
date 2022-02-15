import { useEffect, useRef, useState } from 'react';
import './DropZone.css';

function DropZone({ /* setDropFile, dropFile, */ handleSubmit }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioSource, setAudioSource] = useState('');
  const [dropFile, setDropFile] = useState(')')

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files[0];
    setDropFile(file);

    let reader = new FileReader();
    reader.onload = function (e) {
      setAudioSource(e.target.result)
    };
    if(dropFile) {
      console.log('drop file set')
      reader.readAsDataURL(e.dataTransfer?.files[0]);
    }
  };

  const getDuration = (e) => {
    const duration = e.target.duration;
    console.log()
    console.log(duration);
  };

  useEffect(() => {

  }, [dropFile]);

  const dragHandler = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (dropFile) {
    return (
    <div>
      <div className="drop_zone_submit"
        onDragOver={dragHandler}
        onDrop={dropHandler}
        onClick={handleSubmit}>
        <p>Click here to upload</p>
          <p className='drop_file_name'>{dropFile.name}</p>
        <p>Or drag another file to change Submission!</p>
      </div>
      <audio src={audioSource} onLoadedMetadata={getDuration}></audio>
    </div>)
  } else {
    return (
      <div>
        <div className="drop_zone"
          onDragOver={dragHandler}
          onDrop={dropHandler}>
          <p>{"Drag a file into this Drop Zone ..."}</p>
        </div>
      </div>
    );
  }
}

export default DropZone;