import { useDrag } from 'react-dnd';
import { FamilyMember, ItemTypes } from '../../types';

interface MemberCardProps {
  member: FamilyMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEMBER_CARD,
    item: { id: member.id, x: member.position.x, y: member.position.y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      data-testid={`member-card-${member.id}`}
      style={{
        position: 'absolute',
        left: member.position.x,
        top: member.position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-gray-200 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        {/* Photo - smaller on mobile, larger on desktop */}
        <div className="flex justify-center mb-2 sm:mb-0">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-base sm:text-xl">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Member information - centered on mobile, left-aligned on larger screens */}
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-base sm:text-lg">{member.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {member.birthDate && `Born: ${member.birthDate}`}
            {member.deathDate && ` • Died: ${member.deathDate}`}
          </p>
        </div>
      </div>
    </div>
  );
}
