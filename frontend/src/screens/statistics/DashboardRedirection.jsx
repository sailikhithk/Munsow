import React from "react";
import BarchartAdmin from "./BarchartAdmin";
import BarchartUser from "./Barchart_user";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";

export default function DashboardRedirection() {
    return (<>

        {
            GLOBAL_CONSTANTS?.user_cred?.role_id == 1 ? <>
                <BarchartAdmin />
            </> : <>
                <BarchartUser />
            </>
        }

    </>);
}
