import React from 'react'
import './index.css'
import closeIcon from '../../assets/closeIcon.png'
import onlineIcon from '../../assets/onlineIcon.png'
import './index.css'
const InfoBar = ({room}) => {
  return (
    <div className="infoBar">
        <div className="leftInnerContainer">
        <img src={onlineIcon} alt="" className='onlineIcon' />
        <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close"  className='closeIcon'/></a>
        </div>
    </div>
  )
}

export default InfoBar