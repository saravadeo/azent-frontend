export const colourStyles = {
    allyText          : styles => ({
        outline: "none"
    }),
    container         : styles => ({
        ...styles,
        flexGrow: 1,
        ":focus": {
            outline: "none"
        }
    }),
    control           : styles => ({
        ...styles,
        backgroundColor: "none",
        border         : 0,
        borderBottom   : "2px solid white",
        borderRadius   : 0,
        color          : "white",
        ":focus"       : {
            outline: "none"
        }
    }),
    indicatorContainer: styles => ({
        ...styles,
        color          : "white",
        backgroundColor: "white"
    }),
    placeholder       : styles => ({
        ...styles,
        color   : "white",
        fontSize: "1.4rem"
    }),
    singleValue       : styles => ({
        ...styles,
        color   : "white",
        fontSize: "1.4rem"
    }),
    input             : styles => ({
        ...styles,
        color   : "white",
        fontSize: "1.4rem"
    })
};