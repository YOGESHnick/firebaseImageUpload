import "./App.css";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [uploadedUserData, setUploadedUserData] = useState(null);

  const imagesListRef = ref(storage, "images/");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !firstName || !lastName || profileImage === null) {
      alert("Please fill out all fields and choose an image.");
      return;
    }

    try {
      const imageRef = ref(storage, `images/${profileImage.name + v4()}`);
      await uploadBytes(imageRef, profileImage);
      const imageUrl = await getDownloadURL(imageRef);

      const formData = {
        email,
        firstName,
        lastName,
        profileImage: imageUrl,
      };

      await axios.post("http://localhost:8080/create", formData);

      console.log("Data sent to server:", formData);

      // Store uploaded user data for display
      setUploadedUserData(formData);

    } catch (error) {
      console.error("Error uploading image or sending data to server:", error);
    } finally {
      // Clear form fields after submission (optional)
      setEmail("");
      setFirstName("");
      setLastName("");
      setProfileImage(null);
    }
  };

  return (
    <div className="App">
      <h2>Upload User Data</h2>
      <form onSubmit={handleSubmit}>
      <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <label>Profile Image:</label>
        <input
          type="file"
          onChange={(event) => setProfileImage(event.target.files[0])}
        />
        <button type="submit">Upload User Data</button>
      </form>

      {uploadedUserData && (
        <div>
          <h2>Uploaded User Details</h2>
          <p>Email: {uploadedUserData.email}</p>
          <p>First Name: {uploadedUserData.firstName}</p>
          <p>Last Name: {uploadedUserData.lastName}</p>
          <img src={uploadedUserData.profileImage} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default App;
