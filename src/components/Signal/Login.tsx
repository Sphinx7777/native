import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Identity from '../../models/identity';
import saga from '../../decoradors/saga';
import { MAIL_REGEX } from '../../../src/utils';


interface ICustomInputProps {
    loginUser?: (data: any) => void;
}
interface ICustomInputState {
    userEmail?: string;
    password?: string;
    emailErr?: string;
    passErr?: string;
}
@saga(Identity, ['loginUser'])
class Login extends React.Component<ICustomInputProps, ICustomInputState> {

    state = {
        userEmail: '',
        password: '',
        emailErr: null,
        passErr: null
    }

    handleEmailChange = (userEmail: string) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                userEmail,
                emailErr: this.state.emailErr && null,
                passErr: this.state.passErr && null
            }
        })
    }
    handlePassChange = (password: string) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                password,
                emailErr: this.state.emailErr && null,
                passErr: this.state.passErr && null
            }
        })
    }

    submit = () => {
        const emailValid = this.state.userEmail && this.state.userEmail.search(MAIL_REGEX) >= 0
        const passValid = this.state.password && this.state.password.length >= 8 && this.state.password.length < 50
        if (!passValid) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    passErr: 'Minimum 8, maximum 50 symbols'
                }
            })
        }
        if (!emailValid) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    emailErr: 'Enter valid email'
                }
            })
        }
        if (emailValid && passValid) {
            const data = {password: this.state.password, userEmail: this.state.userEmail}
            this.props.loginUser(data)
            this.setState((prevState) => {
                return {
                    ...prevState,
                    emailErr: null,
                    passErr: null,
                    userEmail: '',
                    password: ''
                }
            })
        }
    } 



    render() {
        const { userEmail, password, passErr, emailErr } = this.state
        const emailDis = !userEmail || userEmail.search(MAIL_REGEX) < 0
        const passDis = !password || password.length < 8 || this.state.password.length > 50

        return (
            <>
                <View style={styles.container}>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputContainer}>
                        <View style={{width: '100%'}}><Text style={{fontWeight: '700'}}>Email*</Text></View>
                            <TextInput
                                style={styles.textInput}
                                autoCapitalize='none'
                                maxLength={100}
                                autoFocus={true}
                                keyboardType='email-address'
                                autoCorrect={false}
                                placeholder='enter email'
                                value={userEmail}
                                onChangeText={this.handleEmailChange}
                            />
                        </View>
                        <View style={{height: 20, paddingVertical: 2, width: '100%', marginBottom: 7}}>
                            {emailErr && <Text style={styles.error}>{emailErr}</Text>}
                            </View>
                        <View style={styles.inputContainer}>
                        <View style={{width: '100%'}}><Text style={{fontWeight: '700'}}>Password*</Text></View>
                            <TextInput
                                style={styles.textInput}
                                placeholder='enter password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='off'
                                secureTextEntry={true}
                                maxLength={50}
                                value={password}
                                onChangeText={this.handlePassChange}
                            />
                        </View>
                        <View style={{height: 20, paddingVertical: 2, width: '100%'}}>
                        {passErr && <Text style={styles.error}>{passErr}</Text>}
                            </View>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={(emailDis || passDis) ? {...styles.button, ...styles.disabled} : {...styles.button}}
                            disabled={(emailDis || passDis)}
                            onPress={this.submit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 500,
        padding: 20,
    },
    inputsContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 40
    },
    inputContainer: {
        width: '100%'
    },
    textInput: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 5,
        width: '100%',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1f6b4e',
        width: 85,
        paddingVertical: 2,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1f6b4e',
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    disabled: {
        backgroundColor: 'gray',
        borderColor: 'gray'
    },
    error: {
        width: '100%',
        paddingHorizontal: 5,
        borderRadius: 5,
        color: 'white',
        backgroundColor: 'red'
    }
});

const mapStateToProps = (state: any) => {
    return {

    };
}


export default connect(mapStateToProps, { ...Identity.actions })(Login)