<Card sx={{ minWidth: 75, m: 1 }} variant="outlined">
    <div style={{ padding: '0 27px' }}>
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <h2>{this.props.dish.dishname}</h2>
            </Grid>
            <Grid item xs={1}>
                <StarRateIcon sx={{ mt: 2.2, color: '#98313e' }} />
            </Grid>
            <Grid item xs={2}>
                <h2 style={{ fontWeight: '500', color: '#98313e' }}>{this.props.dish.rate}</h2>
            </Grid>
        </Grid>
        <Divider />
        <div>
            <p style={{ fontSize: "18px" }}>{this.props.dish.description}</p>
        </div>
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <div>
                    <p style={this.getPriceStyles()}>¥ {this.props.dish.price} / 份</p>
                </div>
            </Grid>
        </Grid>


    </div>
</Card>