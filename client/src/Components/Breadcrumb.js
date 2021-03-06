import React from 'react'
import uniqid from 'uniqid'
import styled from 'styled-components'

//material ui stuff
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

//style components
const StyledArrowIcon = styled(ArrowRightIcon)`
color:rgb(51,153,255);
position:relative;
// top: 7px;
fontSize: 25px;
`

const Nav = styled.div`
ul li{
    display:inline;
    list-style-type: none;
}
li:hover{
    color:rgb(51,153,255);
    text-decoration:underline;
    cursor:pointer;
}


`
function Breadcrum({path, changePath}) {

    let crumbs = path.split('/')

    const handleClick= (index) =>{
        let parts = path.split('/')
        parts.splice(index +1)
        // console.log(parts.join('/'))
        changePath(parts.join('/'))
    }


    return (
        <div>
            <Nav>
                <ul>
                    {crumbs.map((crumb, index) => (
                        <li onClick={()=>handleClick(index)} key={uniqid()}>
                            <StyledArrowIcon  /> {crumb}
                        </li>
                    ))}
                </ul>
            </Nav>
        </div>
    )
}
export default Breadcrum
