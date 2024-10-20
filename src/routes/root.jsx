import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { redirect } from "react-router-dom";
import { Outlet } from "react-router-dom";

export async function action(){
    return redirect ('/game');
}

export default function Root() {
    return (
      <>
        <Form method="post">
            <button type="submit">
                New
            </button>
        </Form> 
        <Outlet />
      </>
    );
  }