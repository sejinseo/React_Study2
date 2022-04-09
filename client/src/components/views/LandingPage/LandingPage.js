import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
    // 랜딩 페이지에 들어오자 마자 get req를 서버에 보냄 엔드 포인트는 '/api/hello'
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
        // 서버에서 돌아오는 rsp를 콘솔에 보여줌
    })
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height:'100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    );
}

export default LandingPage