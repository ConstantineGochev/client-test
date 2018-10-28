import React, { Component} from 'react';
import {connect} from 'react-redux'
import { Button } from 'semantic-ui-react'
import axios from 'axios';

class ProfilePage extends Component {
    constructor(props){
        super()
        this.state = {
            file: null
        }
    }
    on_file_change = (event) => {
        console.log(event.target.files)
        this.setState({
            file: event.target.files[0]
        })
    }
    upload(file, signedRequest, done) {
        const xhr = new XMLHttpRequest();
        console.log(xhr)
        xhr.open('PUT', signedRequest);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.setRequestHeader('Content-Type', 'application/xml');
        xhr.onload = () => {
          if (xhr.status === 200) {
            done();
          }
        };
      
        xhr.send(file);
      }
    test_upload = async () => {
        const uploadConfig = await axios.get('api/upload', {headers: {authorization:this.props.auth.token}})
        console.log(uploadConfig)
        console.log(this.state.file.type)
        console.log(uploadConfig.data.url)
        //await this.upload(this.state.file, uploadConfig.data.url)
        await axios.put(uploadConfig.data.url,this.state.file,{
            'Content-Type': this.state.file.type
        })
    }

    render() {
       // console.log(this.props)
        return (
            <div>
                <input 
                 type="file" 
                 accept="image/*"
                 onChange={this.on_file_change}
                  />
                <Button onClick={this.test_upload}>Save</Button>
            </div>
        )
    }
}


function map_state_to_props (state) {
    return {
        auth: state.auth
    }
}
export default connect(map_state_to_props, {})(ProfilePage)