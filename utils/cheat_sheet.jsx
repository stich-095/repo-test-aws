

// AXIOS POST CON TOKEN

let handleSender = async () => {
    let token = localStorage.getItem('authTokens')
    let acces = JSON.parse(token).access
    alert(acces)
    try {
      
      const response = await axiosInstance.post(
        `/users/testing`, 
        { "cosa":"hola", "cosa2":"hola2" },
        {
          headers: {
            'Authorization': `Bearer ${acces}`
          }
        }
      );
      const data =response.data;
      


    } catch (error) {
      // Handle login errors here
      console.error("Error during login:", error);
    }
  }
