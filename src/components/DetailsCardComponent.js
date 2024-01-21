import React from 'react'

function DetailsCardComponent({ sn, userN, email }) {
    return (
        <div class="card my-2">
            <div class="card-body">
                <h5>{sn}. User Name : {userN} <br /><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Email : {email}</h5>

            </div>
        </div>
    )
}

export default DetailsCardComponent