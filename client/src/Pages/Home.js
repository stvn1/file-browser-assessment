import {useState, useEffect} from 'react'

import uniqid from 'uniqid'

//component
import Breadcrumb from '../Components/Breadcrumb'

//material-ui stuff
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';


const Home = () => {

    const [data, setData] = useState(null);

    //fix netlify proxy issues
    const baseURL ='https://file-browser-backend.herokuapp.com'
    // const baseURL = 'http://localhost:3001'

  
    //load main folder onMount
  useEffect(() => {
    fetch(`${baseURL}/home/`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const traversePath = (dir) =>{

    fetch(`${baseURL}/${data.path}/${dir}`)
    .then((res) => res.json())
    .then((data) => setData(data));

  }
  const breadCrumbTraverse = (path) =>{
    console.log(`${baseURL}/home/${path}`)
    fetch(`${baseURL}/${path}`)
    .then((res) => res.json())
    .then((data) => setData(data));
  }

  const getFile = (dir,file) =>{
      fetch(`${baseURL}/file/${dir.replaceAll('/','.')}/${file}`)
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
          window.open(url, '_blank');
          URL.revokeObjectURL(url);
      });
  }

  const mainPortion = ()=> {
    return (
        <div>
            {data.dir.map( (dir) =>(
            <div className='folder' 
                onClick={()=>traversePath(dir,data.path)} 
                key={uniqid()}> <FolderIcon  style={{fontSize: '15px'}}/> {dir}</div>
            ))}
             {data.files.map( (file) =>(
            <div className='file' 
                onClick={()=>getFile(data.path, file)}
                key={uniqid()}> <FileIcon  style={{fontSize: '15px'}} /> {file}</div>
            ))}
        </div>
    )
  }
    return (
        <div>
            {!data ? null : 
                <Breadcrumb changePath={breadCrumbTraverse}  path={data.path}/>}

            {!data ? "Loading..." : mainPortion()}
        </div>
    )
}
export default Home
