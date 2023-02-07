import React from 'react'

function alert(props) {
    const capitalize = (word)=>{
        if(word === 'danger'){
            word = 'Error'
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height:'50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert"> {/*If props.alert is null nothing will be shown and if it has some value then div will be shown and props.alert.type and props.alert.message in it will also be able to use...This is spl case..*/}
            <strong>{capitalize(props.alert.type)}: {props.alert.msg}</strong>
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>}
        </div>
    )
}

export default alert