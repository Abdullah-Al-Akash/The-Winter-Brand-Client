import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';


const Messenger = () => {
    return (
        <div>
            <FacebookProvider appId="2812207435596760" chatSupport>
                <CustomChat pageId="103643718275734" minimized={"true"} />
            </FacebookProvider>
        </div>
    );
};

export default Messenger;