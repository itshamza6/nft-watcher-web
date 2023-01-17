import React from 'react'
import axios from '../api/axios'
import {toast} from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import {
    Toolbar,
    Box,
    AppBar,
    Button
} from '@mui/material';


const NewsLetter = () => {
    const theme = useTheme();
    const [newsletter, setNewsletter] = React.useState("");
    const [loading, setLoading] = React.useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            axios.post('/newsletters/subscribe', {email: newsletter})
            .then(res => {
                setLoading(false)
                if (res.data.success) {
                    toast.success(res.data.message)
                }else {
                    toast.warn(res.data.message)
                }
            }).catch(err => {
                setLoading(false)
                console.log(err);
            })
        }
    }
    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center justify-content-center row">
                <div className="col-md-6 col-12">
                    <h1>Subscribe to our newsletter</h1>
                    <h6>to get regular updates about interesting and secret upcoming NFT projects and events.</h6>
                </div>
                <form className="col-md-6 col-12" onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center justify-content-center" style={{background: theme.palette.cardColor.main, borderRadius: 10}}>
                        <input value={newsletter} onChange={(e) => setNewsletter(e.target.value)} type="email" style={{width: '100%', height: 50, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 20}} className="ps-4" placeholder="icrnca@gmail.com" required />
                        <Button type="submit" className="m-2 py-3 px-5" style={{borderRadius: 10}} variant="contained" color="primary">Subscribe</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewsLetter
