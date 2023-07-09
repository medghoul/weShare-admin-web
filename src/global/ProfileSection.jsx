
const ProfileSection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '16px',
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '40px',
        }}
      >
        <Input
          placeholder="Destinazione"
          fullWidth
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
        />
      </Box>
    </>
  );
};

export default ProfileSection;
