import { Spinner } from "reactstrap"

export const Loader = () => {
  return (
    <div
     style={{
      display:'flex',
      justifyContent:'center',
      position:'absolute',
      top:'50%',
      left:'50%',
      zIndex:'1'
     }}
    >
      <Spinner>
        Loading...
      </Spinner>
    </div>
  )
}