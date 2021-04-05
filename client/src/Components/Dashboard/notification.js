import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
class Notification extends Component {
    render() {
        toast.configure({
            autoClose: 10000,
            draggable: false
        })
        const notify = () => {
            this.toastId= toast("Please check your email !");

        }
        return (
            <div className="App">
                <button onClick={notify}>Notify !</button>

            </div>
        )
    }
}
export default Notification

    // render() {

//         return (
            
//             <div className="App">
//                 <header>
//                    Please activate your account
//                 </header>
//                 <form onSubmit={this.activate}>
//                     <input type="submit" value="Activate"/>
//                     </form>
//             </div>
//         )
//     }
// }
// export default Activate