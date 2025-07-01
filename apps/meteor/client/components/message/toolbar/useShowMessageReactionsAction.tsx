import type { IMessage } from '@rocket.chat/core-typings';
import { useSetModal, useSetting } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import ReactionListModal from '../../../views/room/modals/ReactionListModal';

export const useShowMessageReactionsAction = (message: IMessage): MessageActionConfig | null => {
	const setModal = useSetModal();
	// Feature: Check if reactions are globally enabled
	const reactionsEnabled = useSetting('Message_Reactions_Enabled', true);

	// Feature: Return null if reactions are disabled globally
	if (!reactionsEnabled || !message.reactions) {
		return null;
	}

	return {
		id: 'reaction-list',
		icon: 'emoji',
		label: 'Reactions',
		context: ['message', 'message-mobile', 'threads', 'videoconf', 'videoconf-threads'],
		type: 'interaction',
		action() {
			setModal(
				<ReactionListModal
					reactions={message.reactions ?? {}}
					onClose={() => {
						setModal(null);
					}}
				/>,
			);
		},
		order: 9,
		group: 'menu',
	};
};
