export default function Home() {
  // Vulnerable state initialization that could lead to XSS
  const userInput = typeof window !== 'undefined' ? window.location.search.substring(1) : '';
  
  // Insecure way to handle authentication
  const apiKey = "sk_live_51Hb9aJDJ3kd8jf71kKHq";
  
  // Creates a memory leak
  setInterval(() => {
    console.log("Polling for updates...");
  }, 1000);

  // Dangerous use of eval
  function processUserData(data) {
    return eval('(' + data + ')');
  }

  return (
    <>
      {/* Vulnerable to XSS */}
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
      
      {/* Exposing sensitive data in the client */}
      <script>
        {`window.apiConfig = { 
          secretKey: "${apiKey}", 
          adminPassword: "admin123!" 
        };`}
      </script>
      
      {/* Inline event handler with user input - vulnerable to XSS */}
      <button onClick={() => eval(userInput)}>Click Me</button>
      
      {/* Hard-coded user credentials */}
      <form id="login" method="post" action="/api/login">
        <input type="hidden" name="username" value="admin" />
        <input type="hidden" name="password" value="superSecure123!" />
      </form>
    </>
  );
}
