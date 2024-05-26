import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadFile from '../helpers/uploadFile';
import { IoClose } from "react-icons/io5";
import Loading from './Loading';
import backgroundImage from '../assets/wallapaper.jpeg'
import { IoMdSend } from "react-icons/io";
import moment from 'moment'

const MessagePage = () => {

    const params = useParams();
    const socketConnection = useSelector(state => state?.user?.socketConnection);
    const user = useSelector(state => state?.user);

    const [dataUser, setDataUser] = useState({
        name : "",
        email : "",
        profile_pic : "",
        online : false,
        _id : ""
    });

    const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
    const [message, setMessage] = useState({
        text : "",
        imageUrl : "",
        videoUrl : ""
    });

    const [loading, setLoading] = useState(false);
    const [allMessage, setAllMessage] = useState([]);
    const currentMessage = useRef(null);


    useEffect(() => {
      if (currentMessage.current) {
        currentMessage.current.scrollIntoView({ behavior : 'smooth', block : 'end' })
      }
    }, [allMessage]);


    const handleUploadImageVideoOpen = () => {
      setOpenImageVideoUpload(preve => !preve)
    }


    const handleUploadImage = async (e) => {
      const file = e.target.files[0];

      setLoading(true);
      const uploadPhoto = await uploadFile(file);
      setLoading(false);
      setOpenImageVideoUpload(false);


      setMessage(preve => {
        return {
          ...preve,
          imageUrl : uploadPhoto.url
        }
      })
    }


    const handleClearUploadImage = () => {
      setMessage(preve => {
        return {
          ...preve,
          imageUrl : ""
        }
      })
    }


    const handleUploadVideo = async (e) => {
      const file = e.target.files[0];

      setLoading(true);
      const uploadPhoto = await uploadFile(file);
      setLoading(false);
      setOpenImageVideoUpload(false);


      setMessage(preve => {
        return {
          ...preve,
          videoUrl : uploadPhoto.url
        }
      })
    }


    const handleClearUploadVideo = () => {
      setMessage(preve => {
        return {
          ...preve,
          videoUrl : ""
        }
      })
    }

  return (
    <div>MessagePage</div>
  )
}

export default MessagePage