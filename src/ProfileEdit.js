import React, { useState, useEffect} from "react";

function ProfileEdit({ userId }) {
    const [user, setUser] = useState({});
  
    // Load user //
    useEffect(() => {
      setUser({});
      const abortController = new AbortController();
      async function loadUser() {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`,
            { signal: abortController.signal }
          );
          const userFromAPI = await response.json();
          setUser(userFromAPI);

        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError` //
            console.log("Aborted", userId);
          } else {
            throw error;
          }
        }
      }

      loadUser();

      return () => abortController.abort();
    }, [userId]); // <-- Added dependency on `userId`

    // Set document title //
    useEffect(() => {
        if (user.username) {
          document.title = `${user.username} : Edit Profile`;
        } else {
          document.title = "Edit Profile";
        }
      }, [user]); // Rerun this effect when the user changes

    // Change handler //
    const changeHandler = event => {
        setUser({ ...user, [event.target.name]: event.target.value });
      }

    // Submit handler //
    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          {
            method: "PUT",
            body: JSON.stringify(user),
          }
        );
        const savedData = await response.json();
        console.log("Saved user!", savedData);
      };
  
    // Form return //
    if (user.id) {
      // `user.id` is truthy after the API call returns
      return (
        <form name="profileEdit" onSubmit={submitHandler}>
          <fieldset>
            <legend>API User ID: {user.id}</legend>
            <div>
              <label htmlFor="username">User Name:</label>
              <input
                id="username"
                name="username"
                type="text"
                required={true}
                value={user.username}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required={true}
                  value={user.email}
                  onChange={changeHandler} 
                />
            </div>
            <button type="submit">Save</button>
          </fieldset>
        </form>
      );
    }
    return "Loading...";
  }

  export default ProfileEdit;