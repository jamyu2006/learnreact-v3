import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { redirect } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const postId = formData.get('postId');
    console.log(postId);

    return redirect(`/${postId}`);
}

export default function Root() {
    const location = useLocation();

    const showButtons = location.pathname === '/';

    return (
        <>
            <div className="form-container">
                {showButtons && (
                    <>
                        <Form method="post">
                            <input type="hidden" name="postId" value="xgame" />
                            <button type="submit">Ai goes first</button>
                        </Form>

                        <Form method="post">
                            <input type="hidden" name="postId" value="ogame" />
                            <button type="submit">Ai goes second</button>
                        </Form>
                    </>
                )}
            </div>
            <Outlet />
        </>
    );
}