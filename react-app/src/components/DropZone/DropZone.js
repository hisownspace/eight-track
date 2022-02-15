import './DropZone.css';

function DropZone({ setDropFile, dropFile, handleSubmit }) {

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files[0];
    console.log(e.dataTransfer);
    setDropFile(file);
  };

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


//dropFile ?  :
export default DropZone;