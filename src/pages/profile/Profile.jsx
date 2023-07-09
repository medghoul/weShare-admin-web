import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    List,
    Typography,
    ListItemButton,
    ListItemText,
    TextField,
    Divider,
    useTheme,
    AppBar,
    Tabs,
    Tab,
    Grid,
    Input,
    OutlinedInput,
    Select,
    MenuItem,
    IconButton,
    Avatar,
    Button
} from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import Topbar from '../../global/Topbar';
import { FormControl } from '@mui/material';
import Footer from '../../global/Footer';
import DoneIcon from '@mui/icons-material/Done';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const StyledBox = styled(Box)({
    backgroundColor: '#F7FAFF',
    borderRadius: '8px',
    padding: '16px',
    width: '45%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    marginBottom: '40px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
});
const Profile = () => {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [cap, setCap] = useState('');
    const [country, setCountry] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);
    const [birthDate, setBirthDate] = useState();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === "personal-details") {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setCap('');
            setCountry('');
        }
    };
    useEffect(() => {
        // Fetch country options from the backend API
        fetchCountryOptions()
            .then((options) => {
                setCountryOptions(options);
            })
            .catch((error) => {
                console.error('Error fetching country options:', error);
            });
    }, []);

    const fetchCountryOptions = async () => {
        // Make your API call here to fetch the country options
        // Replace 'apiEndpoint' with your actual API endpoint URL
        const response = await fetch('apiEndpoint');
        const data = await response.json();
        return data;
    };

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Handle the selected file
        console.log(file);
    };

    return (
        <>
            <Topbar></Topbar>
            <Box sx={{
                backgroundColor: '#F7FAFF', borderRadius: '8px',
                padding: '16px',
                width: '80%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-start',
                position: 'relative',
                marginBottom: '40px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }
            } >
                <Grid item sx={{ marginRight: '10px' }}>
                    <Avatar
                        alt="profile-image"
                        variant="rounded"
                        size="xl"
                        shadow="sm"
                    />
                </Grid>
                <Box height="100%" mt={0.5} lineHeight={1}>
                    <Typography variant="h5" fontWeight="medium">
                        User Name
                    </Typography>
                    <Typography variant="button" color="text" fontWeight="medium">
                        CEO / Co-Founder
                    </Typography>
                </Box>
                <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                    <AppBar position="static" sx={{ backgroundColor: '#F7FAFF' }}>
                        <Tabs
                            orientation={tabsOrientation}
                            sx={{ background: "transparent" }}
                        >
                            <Tab label="App" icon={<EmailIcon />} />
                            <Tab label="Message" icon={<AccountBoxIcon />} />
                            <Tab label="Settings" icon={<SettingsIcon />} />
                        </Tabs>
                    </AppBar>
                </Grid>
            </Box >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <StyledBox>
                    <List
                        component="nav"
                        sx={{
                            borderRadius: '10px',
                            minWidth: '100%',
                            [theme.breakpoints.down('md')]: {
                            },
                            '& .MuiListItemButton-root': {
                                mt: 0.5
                            }
                        }}>
                        <ListItemButton sx={{ borderRadius: `10px`, margin: '10px' }} onClick={() => handleOptionSelect("verify-your-profile")}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircleOutlineIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }}></AddCircleOutlineIcon>
                                <ListItemText primary={<Typography variant="body2">Verify your profile</Typography>} />
                            </div>
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `10px`, margin: '10px' }} onClick={() => handleOptionSelect("add-profile-picture")}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircleOutlineIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }}></AddCircleOutlineIcon>
                                <ListItemText primary={<Typography variant="body2">Add profile picture</Typography>} />
                            </div>
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `10px`, margin: '10px' }} onClick={() => handleOptionSelect("personal-details")}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircleOutlineIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }} />
                                <ListItemText primary={<Typography variant="body2">Personal details</Typography>} />
                            </div>
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `10px`, margin: '10px' }} onClick={() => handleOptionSelect("vehicles")}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircleOutlineIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }} />
                                <ListItemText primary={<Typography variant="body2">Vehicles</Typography>} />
                            </div>
                        </ListItemButton>
                        <Divider />
                    </List>
                </StyledBox>
                <StyledBox>
                    {selectedOption === "personal-details" && (
                        <FormControl sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{ width: 'calc(50% - 5px)' }}
                            />
                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{ width: 'calc(50% - 5px)' }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker />
                            </LocalizationProvider>

                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{ width: 'calc(50% - 5px)' }}
                            />
                            <TextField
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{ width: 'calc(50% - 5px)' }}
                            />
                            <TextField
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{ width: 'calc(50% - 5px)' }}
                            />
                            <TextField
                                label="Zip code"
                                value={cap}
                                onChange={(e) => setCap(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{ width: 'calc(50% - 5px)' }}
                            />
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Select Country
                                </MenuItem>
                                {countryOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                style={{ marginTop: 16, marginBottom: 16 }}
                                disableElevation
                                size="large"
                                color={theme.palette.main}
                            >
                                Save
                            </Button>

                        </FormControl>
                    )}
                    {selectedOption === "verify-your-profile" && (
                        <FormControl sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <List
                                component="nav"
                                sx={{
                                    borderRadius: '10px',
                                    minWidth: '100%',
                                    [theme.breakpoints.down('md')]: {
                                    },
                                    '& .MuiListItemButton-root': {
                                        mt: 0.5
                                    }
                                }}>
                                <ListItemButton sx={{ borderRadius: `10px`, margin: '10px' }} >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckCircleOutlineIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }}></CheckCircleOutlineIcon>
                                        <ListItemText primary={<Typography variant="body2">Confirm your email</Typography>} />
                                    </div>
                                </ListItemButton>
                                <ListItemButton sx={{ borderRadius: `10px`, margin: '10px' }} >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <DoneIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }}></DoneIcon>
                                        <ListItemText primary={<Typography variant="body2">Confirm your phone number</Typography>} />
                                    </div>
                                </ListItemButton>
                            </List>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                style={{ marginTop: 16, marginBottom: 16 }}
                                disableElevation
                                size="large"
                                color={theme.palette.main}
                            >
                                Save
                            </Button>

                        </FormControl>
                    )}
                    {selectedOption === "add-profile-picture" && (
                        <FormControl sx={{ display: 'flex',alignItems:'center', flexDirection: 'row', justifyContent: 'space-between',width:'100%' }}>
                            <OutlinedInput 
                            sx={{ width: 'calc(50% - 5px)',height:'56px' }}
                                endAdornment={
                                    <>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <IconButton onClick={handleButtonClick}>
                                            <UploadFileIcon />
                                        </IconButton>
                                    </>
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ width: 'calc(50% - 5px)',height:'56px' }}
                                color={theme.palette.main}
                            >
                                Save
                            </Button>

                        </FormControl>
                    )}
                    {selectedOption === "vehicles" && (
                        <FormControl sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="" disabled>
                                    Select Country
                                </MenuItem>
                                {countryOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' }}>
                                <TextField
                                    label="Plate number?"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    sx={{ width: 'calc(50% - 5px)' }}
                                />
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    displayEmpty
                                    margin="normal"
                                    sx={{ width: 'calc(50% - 5px)', height: '56px' }}
                                >
                                    <MenuItem value="" disabled>
                                        vehicle's brand
                                    </MenuItem>
                                    {countryOptions.map((option) => (
                                        <MenuItem key={option.id} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' }}>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    displayEmpty
                                    margin="normal"
                                    sx={{ width: 'calc(50% - 5px)', height: '56px' }}
                                >
                                    <MenuItem value="" disabled>
                                        vehicle's model
                                    </MenuItem>
                                    {countryOptions.map((option) => (
                                        <MenuItem key={option.id} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    displayEmpty
                                    margin="normal"
                                    sx={{ width: 'calc(50% - 5px)', height: '56px' }}
                                >
                                    <MenuItem value="" disabled>
                                        color
                                    </MenuItem>
                                    {countryOptions.map((option) => (
                                        <MenuItem key={option.id} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>

                            <TextField
                                label="Year of registration"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                style={{ marginTop: 16, marginBottom: 16 }}
                                disableElevation
                                size="large"
                                color={theme.palette.main}
                            >
                                Save
                            </Button>

                        </FormControl>
                    )}
                </StyledBox>
            </Box>
            <Footer></Footer>
        </>
    );
}
export default Profile;
