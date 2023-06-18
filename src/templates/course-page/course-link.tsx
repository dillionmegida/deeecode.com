import React from 'react'
import { LINKS } from '../../constants'
import { Link } from 'gatsby'

export default function CourseLink({ course, path, label }) {
    const link = LINKS.courses[course].sub[path]
  
    return <Link to={link}>{label}</Link>
  }
  