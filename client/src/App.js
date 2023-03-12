import Routing from "./containers/Routing";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Routing />
    </UserProvider>
  );
}

export default App;
