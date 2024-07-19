import React, {Component} from 'react';

export class Home extends Component{

    render(){
        return(
		<>
		<img src="https://std-mgmt-bucket1.s3.us-east-2.amazonaws.com/uni.png" />
            <div className='mt-5 d-flex justify-content-left'>
                This is Home page
            </div></>
        )
    }
}
