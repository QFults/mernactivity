import { gql } from '@apollo/client'

export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
      _id
      name
      skills
    }
  }
`

export const QUERY_SINGLE_PROFILE = gql`
  query profile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`
