import React from 'react'
import toast from 'react-hot-toast';

const Profile = () => {
    const handleUpdate = async()=>{
        const res= await fetch('http://localhost:3000/api/user/updateUser', {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                userId, 
                name, 
                email, 
                password, 
                profilepic,
            }),
        });

        const data = await res.json();
        if(data.success){
            toast.success("Profile Updated");
        }else{
            toast.error(data.message);
        }
    }
    const handleFileUpload= async(event)=>{
        const file= event.target.files[0];
        if(!file)  return;
        const data = new FormData();
        data.append("file", file)
        data.append("upload")

    }
  return (
    <div>
      <input type="file" className='file-input' onChange={handleFileUpload} />
    </div>
  )
}

export default Profile
