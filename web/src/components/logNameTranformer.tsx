export const activieLogNamer = (dat) => {
  const { type, from, to, by } = dat
  let tex = type

  switch (type) {
    case 'l_ctd':
      return (tex = 'Lead Created')
    case 'sts_change':
      return (tex = `completed & moved to`)
    case 'assign_change':
      return (tex = `Lead Assigned To`)
    default:
      return (tex = type)
  }
  return tex
}

export const empNameSetter = (usersList, emp_id) => {
    const userIsA = usersList?.filter((userD) => {
      return userD?.uid == emp_id
    })
    if (userIsA[0]) {
      const { email } = userIsA[0] || []
      return email
    } else {
      return emp_id
    }
  }
