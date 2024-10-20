import { NavLink } from "react-router-dom";

export default function Root() {
    return (
      <>
        <nav>
          {/* Example route link to /game or another route */}
          <NavLink to="/game" style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? 'blue' : 'black'
          })}>
            Hello
          </NavLink>
        </nav>
      </>
    );
  }