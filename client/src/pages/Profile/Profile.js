import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../../utils/queries";
import SkillsList from "../../components/SkillsList";

function Profile() {
  const { profileId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="card-header">
        {profile.name}'s friends have endorsed these skills...
      </h2>
      {profile.skills?.length > 0 && <SkillsList skills={profile.skills} />}
    </div>
  );
}

export default Profile;
