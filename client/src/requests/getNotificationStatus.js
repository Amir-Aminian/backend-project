const getNotificationStatus = async (data) => {
  const response = await fetch(
    new Request(
      "http://localhost:8080/api/notificationStatus", 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default getNotificationStatus;
