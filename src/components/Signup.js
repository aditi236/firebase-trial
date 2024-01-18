import React, { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()


    async function handleSubmit(e) {

        e.preventDefault()

        const ref = collection(db, 'users')
        await addDoc(ref, {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value
        })

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)

            nav("/")
        } catch (e) {
            console.error('Failed to create an account', e)
            setError('Failed to create an account')
        }

        setLoading(false)

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="First Name">
                            <Form.Label>
                                First Name
                            </Form.Label>
                            <Form.Control type="firstName" ref={firstNameRef} required />
                        </Form.Group>
                        <Form.Group id="Last Name">
                            <Form.Label>
                                Last Name
                            </Form.Label>
                            <Form.Control type="lastName" ref={lastNameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>
                                Password Confirmation
                            </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>

            </Card>
            <div className="w-100 text-center mt-2"> Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
