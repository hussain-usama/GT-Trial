import { UncontrolledAlert } from "reactstrap"

export const Toaster=(props)=>{
    return(
        <UncontrolledAlert color={props.color}>
                {props.message}
        </UncontrolledAlert>
    )
}