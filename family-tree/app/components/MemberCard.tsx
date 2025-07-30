import { FamilyMember } from '../../types'

interface MemberCardProps {
  member: FamilyMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center space-x-4">
        {member.photo ? (
          <img 
            src={member.photo} 
            alt={member.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-xl">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
        
        <div>
          <h3 className="font-bold text-lg">{member.name}</h3>
          {member.title && <p className="text-gray-600">{member.title}</p>}
          <p className="text-sm text-gray-500">
            {member.birthDate && `Born: ${member.birthDate}`}
            {member.deathDate && ` • Died: ${member.deathDate}`}
          </p>
        </div>
      </div>
    </div>
  )
}