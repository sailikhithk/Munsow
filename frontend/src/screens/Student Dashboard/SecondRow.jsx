import React from 'react';
import { Avatar, Divider, Typography } from '@mui/material'; // Import Material-UI components
import InsightsIcon from '@mui/icons-material/Insights';

const SecondRow = () => {
    return (
        <div className="col-span-1 bg-white p-8 rounded-lg">
            <div className='flex justify-between items-center'>
                <div className='flex flex-row justify-start items-center space-x-4'>
                    <div className="flex-shrink-0">
                        <Avatar
                            src="your_image_url.jpg"
                            alt="Image Description"
                            sx={{ width: 50, height: 50 }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6">Description Text 1</Typography>
                    </div>
                </div>
                <div>
                    <InsightsIcon />
                </div>
            </div>
            <Divider className='pt-4' />
            <div className='flex justify-between items-center pt-4'>
                <div className='flex flex-row justify-start items-center space-x-4'>
                    <div className="flex-shrink-0">
                        <Avatar
                            src="your_image_url.jpg"
                            alt="Image Description"
                            sx={{ width: 50, height: 50 }}
                        />
                    </div>
                    <div>
                        <Typography variant="h6">Description Text 1</Typography>
                    </div>
                </div>
                <div>
                    <InsightsIcon />
                </div>
            </div>

        </div>
    );
};

export default SecondRow;
